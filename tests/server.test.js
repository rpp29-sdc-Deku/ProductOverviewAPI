const chai = require('chai')
const expect = chai.expect;
const before = chai.before;
const request = require('supertest')('http://localhost:9110')

describe('PRODUCT OVERVIEW API CALLS', () => {

  describe('GET /products/:product_id', () => {
    let response;

    beforeEach(async () => {
      response = await request.get('/products/1')
    });

    it(`Should return a product object with matching product id.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body.id).to.eql(1);
    });

    it(`Should return a product object containing the key name.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property(`name`);
    });

    it(`Should return a product object containing the key slogan.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property(`slogan`);
    });

    it(`Should return a product object containing the key description.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property(`description`);
    });

    it(`Should return a product object containing the key category.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property(`category`);
    });

    it(`Should return a product object containing the key original_price.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property(`original_price`);
    });

    it(`Should return a product object containing the key features.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property(`features`)
    });

    it('Should expect features to be an array.', () => {
      expect(response.status).to.eql(200);
      expect(response.body.features).be.an('array');
    });
  });

  describe('GET products/:product_id/styles', () => {
    let response;

    beforeEach(async  () => {
      response = await request.get('/products/1/styles');
    });

    it(`Should return an object containing the key product_id.`, () => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property(`product_id`)
    });

    it(`Should return an object containg the key results.`, () => {
      expect(response.body).to.have.property(`results`);
    });

    it(`Should expect results value to be an array`, () => {
      expect(response.body.results).to.be.an('array');
    });
  })

  describe(`POST /related-products`, () => {
    let response;

    beforeEach(async () => {
      response = await request.post(`/related-products`,  {
        "productIds": [13, 99, 888]
      });
    });

    it('Should return an array of related items.',  () => {
      console.log('RESPONSE ======= ', response.body);
      expect(response.body).to.be.an('array');
    })
  })

})