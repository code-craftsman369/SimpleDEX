const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleDEX", function () {
  let simpleDEX;
  let tokenA;
  let tokenB;
  let owner;
  let user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    // テスト用トークンをデプロイ
    const TestToken = await ethers.getContractFactory("TestToken");
    tokenA = await TestToken.deploy("Token A", "TKA", ethers.parseEther("1000000"));
    tokenB = await TestToken.deploy("Token B", "TKB", ethers.parseEther("1000000"));

    // SimpleDEXをデプロイ
    const SimpleDEX = await ethers.getContractFactory("SimpleDEX");
    simpleDEX = await SimpleDEX.deploy(tokenA.target, tokenB.target);

    // user1にトークンを転送
    await tokenA.transfer(user1.address, ethers.parseEther("10000"));
    await tokenB.transfer(user1.address, ethers.parseEther("10000"));
  });

  describe("流動性の追加", function () {
    it("初回の流動性追加が成功すること", async function () {
      const amountA = ethers.parseEther("100");
      const amountB = ethers.parseEther("100");

      await tokenA.approve(simpleDEX.target, amountA);
      await tokenB.approve(simpleDEX.target, amountB);

      await expect(simpleDEX.addLiquidity(amountA, amountB))
        .to.emit(simpleDEX, "LiquidityAdded");

      expect(await simpleDEX.reserveA()).to.equal(amountA);
      expect(await simpleDEX.reserveB()).to.equal(amountB);
    });
  });

  describe("スワップ機能", function () {
    beforeEach(async function () {
      // 流動性を追加
      const amountA = ethers.parseEther("1000");
      const amountB = ethers.parseEther("1000");

      await tokenA.approve(simpleDEX.target, amountA);
      await tokenB.approve(simpleDEX.target, amountB);
      await simpleDEX.addLiquidity(amountA, amountB);
    });

    it("TokenA → TokenB のスワップが成功すること", async function () {
      const swapAmount = ethers.parseEther("10");

      await tokenA.connect(user1).approve(simpleDEX.target, swapAmount);

      const amountOut = await simpleDEX.getAmountOut(tokenA.target, swapAmount);

      await expect(simpleDEX.connect(user1).swap(tokenA.target, swapAmount))
        .to.emit(simpleDEX, "Swap");

      expect(amountOut).to.be.gt(0);
    });

    it("TokenB → TokenA のスワップが成功すること", async function () {
      const swapAmount = ethers.parseEther("10");

      await tokenB.connect(user1).approve(simpleDEX.target, swapAmount);

      const amountOut = await simpleDEX.getAmountOut(tokenB.target, swapAmount);

      await expect(simpleDEX.connect(user1).swap(tokenB.target, swapAmount))
        .to.emit(simpleDEX, "Swap");

      expect(amountOut).to.be.gt(0);
    });
  });

  describe("流動性の削除", function () {
    beforeEach(async function () {
      const amountA = ethers.parseEther("1000");
      const amountB = ethers.parseEther("1000");

      await tokenA.approve(simpleDEX.target, amountA);
      await tokenB.approve(simpleDEX.target, amountB);
      await simpleDEX.addLiquidity(amountA, amountB);
    });

    it("流動性の削除が成功すること", async function () {
      const liquidityAmount = await simpleDEX.liquidity(owner.address);

      await expect(simpleDEX.removeLiquidity(liquidityAmount))
        .to.emit(simpleDEX, "LiquidityRemoved");

      expect(await simpleDEX.reserveA()).to.equal(0);
      expect(await simpleDEX.reserveB()).to.equal(0);
    });
  });
});