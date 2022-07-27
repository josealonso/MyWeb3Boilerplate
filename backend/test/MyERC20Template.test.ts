import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyERC20Template", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployMyERC20TemplateFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MyERC20Template = await ethers.getContractFactory("MyERC20Template");
    const myERC20Template = await MyERC20Template.deploy();

    return { myERC20Template, owner, otherAccount };
  }

  describe("Create tokens", function () {
    const NAME = "Petete";
    const SYMBOL = "PTT";
    const SUPPLY = 300000;
    const AMOUNT = 100;

    it("Should create a new contract", async function () {
      const { myERC20Template, owner, otherAccount } = await loadFixture(deployMyERC20TemplateFixture);
      // new myERC20Template()
      await myERC20Template.createToken(NAME, SYMBOL, SUPPLY);
      expect(await myERC20Template.name()).to.equal(NAME);
    });

    it("Should create tokens with the expected attributes", async function () {
      const { myERC20Template, owner, otherAccount } = await loadFixture(deployMyERC20TemplateFixture);
      await myERC20Template.createToken(NAME, SYMBOL, SUPPLY);
      expect(await myERC20Template.name()).to.equal(NAME);
      expect(await myERC20Template.symbol()).to.equal(SYMBOL);
      expect(await myERC20Template.totalSupply()).to.equal(SUPPLY);
    });

    it("Should not allow to mint more tokens", async function () {
      const { myERC20Template, owner, otherAccount } = await loadFixture(deployMyERC20TemplateFixture);
      await myERC20Template.createToken(NAME, SYMBOL, SUPPLY);
      await expect(myERC20Template.mint(owner.address, AMOUNT)).to.be.revertedWith(
        "All the tokens have been minted"
      );
    });

    it("Should transfer all the tokens to the EOA", async function () {
      const { myERC20Template, owner, otherAccount } = await loadFixture(deployMyERC20TemplateFixture);
      expect(await myERC20Template.balanceOf(owner.address)).to.equal(0);
      await myERC20Template.connect(owner).createToken(NAME, SYMBOL, SUPPLY);
      let totalSupply = await myERC20Template.totalSupply();
      expect(await myERC20Template.balanceOf(owner.address)).to.equal(ethers.BigNumber.from(totalSupply));
      await myERC20Template.connect(owner).transfer(otherAccount.address, SUPPLY);
      expect(await myERC20Template.balanceOf(otherAccount.address)).to.equal(SUPPLY);
      expect(await myERC20Template.balanceOf(owner.address)).to.equal(ethers.BigNumber.from(0));
      // await expect(myERC20Template.mint(owner.address, AMOUNT)).to.be.revertedWith("All the tokens have been minte");
    });
  });

});

  //   it("Should set the right owner", async function () {
  //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.owner()).to.equal(owner.address);
  //   });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
  // });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  // });
// });
