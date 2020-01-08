var expect = require('chai').expect
const md5 = require('md5')
const util = require('./../utils')
// var assert = require('chai').assert// chai断言库
// assert.typeOf(addNum, 'string')

/*
测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。
describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"测试index.js"），第二个参数是一个实际执行的函数。

it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称，第二个参数是一个实际执行的函数。
*/

describe('Util function test', function() {
  describe('returnMsg()', function() {
    it('should return object when the value is not present', function() {
      expect(util.returnMsg()).to.be.an('object')
    })
  })

  describe('returnSuccess()', function() {
    it('should return object when the value is not present', function() {
      expect(util.returnSuccess()).to.be.an('object')
    })
  })

  describe('addSalt()', function() {
    it('should return  when the value is not present', function() {
      expect(util.addSalt(1, 2)).to.be.equal(md5(1 + 2))
    })
  })
})
