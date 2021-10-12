// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Token contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Waves");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an Assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should have zero token minted by default", async function () {
      expect(await hardhatToken.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Allows minting by paying price", async function () {
      await hardhatToken.mintForSelf({
        value: ethers.utils.parseEther("0.01"),
      });
      const o = await hardhatToken.ownerOf(0);
      expect(o).to.equal(owner.address);
    });
  });

  describe("Rendering", function () {
    it("Can draw", async function () {
      for (var i = 0; i < 10; i++) {
        await hardhatToken.mintForSelf({
          value: ethers.utils.parseEther("0.01"),
        });
        const o = await hardhatToken.ownerOf(i);
        expect(o).to.equal(owner.address);
        const output = await hardhatToken.tokenURI(i);
        //console.log(Buffer.from(output.slice(29), "base64").toString("utf-8"));
        const json = JSON.parse(
          Buffer.from(output.slice(29), "base64").toString("utf-8")
        );
        expect(json.name).to.equal(`Waves #${i + 1}`);
        const svg = Buffer.from(json.image.slice(26), "base64").toString(
          "utf-8"
        );
        console.log(svg);
      }
    });
  });
});
