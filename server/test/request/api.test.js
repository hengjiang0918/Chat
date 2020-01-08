const superagent = require('supertest')
let url = 'http://localhost:3000'
describe('API test', function() {
  beforeEach(() => {
    console.info('UserAPI test start')
  })
  describe('user api', () => {
    it('login respond done', function(done) {
      superagent(url)
        .post('/users/signIn')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
    it('signUp respond done', function(done) {
      superagent(url)
        .post('/users/signUp')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
  })
  describe('Chat api', () => {
    beforeEach(() => {
      console.info('ChatAPI test start')
    })

    it('saveChat respond done', function(done) {
      superagent(url)
        .post('/chat/saveChat')
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('getChat data respond done', function(done) {
      superagent(url)
        .get('/chat')
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })
})
