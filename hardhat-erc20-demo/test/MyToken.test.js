const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken - Basic ERC20 Tests", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy("MyToken", "MTK", 1000);
    await token.waitForDeployment();
  });

  it("✅ Khởi tạo đúng tên, ký hiệu và tổng cung", async function () {
    expect(await token.name()).to.equal("MyToken");
    expect(await token.symbol()).to.equal("MTK");
    expect(await token.totalSupply()).to.equal(ethers.parseUnits("1000", 18));
  });

  it("✅ Toàn bộ token được cấp cho người triển khai", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("✅ Có thể chuyển token giữa các tài khoản", async function () {
    await token.transfer(addr1.address, ethers.parseUnits("100", 18));
    const balance1 = await token.balanceOf(addr1.address);
    expect(balance1).to.equal(ethers.parseUnits("100", 18));
  });

  it("✅ Không thể chuyển vượt quá số dư", async function () {
    await expect(
      token.connect(addr1).transfer(owner.address, ethers.parseUnits("1", 18))
    ).to.be.reverted;
  });

  it("✅ Hỗ trợ approve và transferFrom", async function () {
    await token.approve(addr1.address, ethers.parseUnits("50", 18));
    await token
      .connect(addr1)
      .transferFrom(owner.address, addr2.address, ethers.parseUnits("20", 18));

    const addr2Balance = await token.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(ethers.parseUnits("20", 18));
  });
});
