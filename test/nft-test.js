const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MyNFT', () =>
{ 
    // this.setTimeout(() => {
        
    // }, 50000);
    let myNFT;
    let owner;
    let acc1
    let acc2

    this.beforeEach(async () =>
    {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        [owner, acc1, acc2] = await ethers.getSigners();
        myNFT = await MyNFT.deploy();
    })

    it('should set the right owner', async () =>
    {
        expect(await myNFT.owner()).to.equal(owner.address);
    })

    it("should mint one NFT", async () =>
    {
        expect(await myNFT.balanceOf(acc1.address)).to.equal(0);

        const tokenURI = "https://example.com/token/1";
        const tx = await myNFT.connect(owner).safeMint(acc1.address, tokenURI);

        expect(await myNFT.balanceOf(acc1.address)).to.equal(1);
    })

    it("should set the correct tokenURI", async () =>
    {
        const tokenURI_1 = "https://example.com/1";
        const tokenURI_2 = "https://example.com/2";

        const tx1 = await myNFT.connect(owner).safeMint(acc1.address, tokenURI_1);
        await tx1.wait();

        const tx2 = await myNFT.connect(owner).safeMint(acc2.address, tokenURI_2);
        await tx2.wait();

        expect(await myNFT.tokenURI(0)).to.equal(tokenURI_1);
        expect(await myNFT.tokenURI(1)).to.equal(tokenURI_2);

    })
 })