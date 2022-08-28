// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol"; //supply
import "@openzeppelin/contracts/utils/Counters.sol"; //counter


contract Sora is ERC1155, Ownable, ERC1155Supply {

    constructor() ERC1155("https://api.sora.com/image/") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;

    


     // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;
    Counters.Counter private _numOfTxs;
    uint256 private _volume;

    // Initializing variables

    event TokenListed(address contractAddress, address seller, uint256 tokenId, uint256 amount, uint256 pricePerToken, address[] privateBuyer, bool privateSale, uint listingId);
    event TokenSold(address contractAddress, address seller, address buyer, uint256 tokenId, uint256 amount, uint256 pricePerToken, bool privateSale);
    event ListingDeleted(address contractAddress, uint listingId);

    mapping(uint256 => Listing) private idToListing;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) private _sellerBalance;

    Listing[] private listingsArray;

    struct Listing {
        address contractAddress;
        address seller;
        address[] buyer;
        uint256 tokenId;
        uint256 amount;
        uint256 price;
        uint256 tokensAvailable;
        bool privateListing;
        bool completed;
        uint listingId;
    }

    struct Stats {
        uint256 volume;
        uint256 itemsSold;
    }


    // Mints a new token and adds it to the list of listings returning listing id.
    function mint( string memory tokenURI, uint256 tokenID, uint256 amount, uint256 price, address[] memory privateBuyer)
        public
    {
       
        require(tokenID > 0, "Token should be greater than zero.");
        require(!exists(tokenID), "Token already exists.");
        setApprovalForAll(address(this), true); //approval given to same marketplace
        _mint(msg.sender, tokenID, amount, "");

        _setTokenUri(tokenID, tokenURI);

        listToken(address(this), tokenID, amount, price, privateBuyer);

    }

    function uri(uint256 tokenId) override public view 
    returns (string memory) { 
        return(_tokenURIs[tokenId]); 
    } 

    function _setTokenUri(uint256 tokenId, string memory tokenURI)
    private {
         _tokenURIs[tokenId] = tokenURI; 
    } 



    // listToken takes relevant information and saves the unpaid transaction to idToListing while emititting the event and returning the listingId.
    // Could potentially lead to re-entrancy, https://docs.soliditylang.org/en/v0.8.7/security-considerations.html#re-entrancy
    function listToken(address contractAddress, uint256 tokenId, uint256 amount, uint256 price, address[] memory privateBuyer) public returns(uint256) {
        ERC1155 token = ERC1155(contractAddress);

        require(amount > 0, "Amount must be greater than 0!");
        require(token.balanceOf(msg.sender, tokenId) >= amount, "Caller must own given token!");
        require(token.isApprovedForAll(msg.sender, address(this)), "Contract must be approved!");

        bool privateListing = privateBuyer.length>0;
        _listingIds.increment();
        uint256 listingId = _listingIds.current();
        idToListing[listingId] = Listing(contractAddress, msg.sender, privateBuyer, tokenId, amount, price, amount, privateListing, false, _listingIds.current());
        listingsArray.push(idToListing[listingId]);

        emit TokenListed(contractAddress, msg.sender, tokenId, amount, price, privateBuyer, privateListing, _listingIds.current());

        return _listingIds.current();
    }

    // purchaseToken takes listingId and amount to process the transaction while taking fee(2%) from the seller.
    // Could potentially lead to re-entrancy, https://docs.soliditylang.org/en/v0.8.7/security-considerations.html#re-entrancy

    function purchaseToken(uint256 listingId, uint256 amount) public payable {
        ERC1155 token = ERC1155(idToListing[listingId].contractAddress);
        address seller_id = idToListing[listingId].seller;

        // Loop is not over a certain iteration, which may lead to contracts being stalled because iterations being more than block gas limit. 
        if(idToListing[listingId].privateListing == true) {
            bool whitelisted = false;
            for(uint i=0; i<idToListing[listingId].buyer.length; i++){
                if(idToListing[listingId].buyer[i] == msg.sender) {
                    whitelisted = true;
                }
            }
            require(whitelisted == true, "Sale is private!");
        }

        require(msg.sender != seller_id, "Can't buy your own tokens!");
        require(amount == 1, "You can only get one token at a time.");
        require(msg.value >= idToListing[listingId].price * amount, "Insufficient funds!");
        require(token.balanceOf(seller_id, idToListing[listingId].tokenId) >= amount, "Seller doesn't have enough tokens!");
        require(idToListing[listingId].completed == false, "Listing is not available anymore!");
        require(idToListing[listingId].tokensAvailable >= amount, "Not enough tokens left!");
        
        _numOfTxs.increment();
        _volume += idToListing[listingId].price * amount;

        idToListing[listingId].tokensAvailable -= amount;
        listingsArray[listingId-1].tokensAvailable -= amount;
        if(idToListing[listingId].privateListing == false){
            idToListing[listingId].buyer.push(msg.sender);
            listingsArray[listingId-1].buyer.push(msg.sender);
        }
        if(idToListing[listingId].tokensAvailable == 0) {
            idToListing[listingId].completed = true;
            listingsArray[listingId-1].completed = true;
        }

        emit TokenSold(
            idToListing[listingId].contractAddress,
            seller_id,
            msg.sender,
            idToListing[listingId].tokenId,
            amount,
            idToListing[listingId].price,
            idToListing[listingId].privateListing
        );
        setApprovalForAll(address(this), true); //approval given to marketplace
        token.safeTransferFrom(seller_id, msg.sender, idToListing[listingId].tokenId, amount, "");
        uint256 amount_earned_seller = (idToListing[listingId].price * amount/50)*49;
        
        // try to get seller balance
        if(_sellerBalance[seller_id] == 0){
            _sellerBalance[seller_id] = amount_earned_seller;
        } else {
            _sellerBalance[seller_id] += amount_earned_seller;
        }
        // payable(idToListing[listingId].seller).transfer((idToListing[listingId].price * amount/50)*49); //Transfering 98% to seller, fee 2%  ((msg.value/50)*49)
    }

    // deleteListing takes listingId to delete the listing if permission is there.
    function deleteListing(uint _listingId) public {
        require(msg.sender == idToListing[_listingId].seller, "Not caller's listing!");
        require(idToListing[_listingId].completed == false, "Listing not available!");
        
        idToListing[_listingId].completed = true;
        listingsArray[_listingId-1].completed = true;

        emit ListingDeleted(idToListing[_listingId].contractAddress, _listingId);
    }

    // viewAllListings returns all the listings.
    function  viewAllListings() public view returns (Listing[] memory) {
        return listingsArray;
    }

    // Get a listing by id.
    function viewListingById(uint256 _id) public view returns(Listing memory) {
        return idToListing[_id];
    }

    // View the number of transactions.
    function viewStats() public view returns(Stats memory) {
        return Stats(_volume, _numOfTxs.current());
    }

    // Withdraw the fee accumulated on smart contract.
    function withdrawFees() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    // Get the balance of the seller.
    function getSellerBalance(address _seller) public view returns(uint256) {
        return _sellerBalance[_seller];
    }

    // Withdraw the balance of the seller.
    function withdrawSellerBalance(address _seller, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount must be greater than 0!");
        require(_sellerBalance[_seller] >= amount, "Insufficient funds!");
        _sellerBalance[_seller] -= amount;
        payable(msg.sender).transfer(amount);
    }


}
