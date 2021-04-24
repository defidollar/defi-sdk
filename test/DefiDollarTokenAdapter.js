const TokenAdapter = artifacts.require('DefiDollarTokenAdapter');

contract('DefiDollarTokenAdapter', () => {
  const tokenAddress = '0x5bc25f649fc4e26069ddf4cf4010f9f706c23831';

  let accounts;
  let tokenAdapter;
  const DUSD = [tokenAddress, 'DefiDollar', 'DUSD', '18'];

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    await TokenAdapter.new({ from: accounts[0] }).then((result) => {
      tokenAdapter = result.contract;
    });
  });

  it('should return correct components', async () => {
    await tokenAdapter.methods['getComponents(address)'](tokenAddress)
      .call()
      .then((result) => {
        console.dir(result, { depth: null });
      });
  });

  it('should return correct metadata', async () => {
    await tokenAdapter.methods['getMetadata(address)'](tokenAddress)
      .call()
      .then((result) => {
        assert.deepEqual(result, DUSD);
      });
  });
});
