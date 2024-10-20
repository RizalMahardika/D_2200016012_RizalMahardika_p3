const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
    let itemId;

    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                itemId = res.body.id; 
                console.log('Created item ID:', itemId);
                done();
            });
    });

    it('should return a single item', (done) => {
        request(app)
            .get(`/api/items/${itemId}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('name', 'Item 3');
                done();
            });
    });

    it('should update an item', (done) => {
        const updatedItem = { name: 'Updated Item 3' };
        request(app)
            .put(`/api/items/${itemId}`)
            .send(updatedItem)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('name', 'Updated Item 3'); 
                done();
            });
    });

    it('should delete an item', (done) => {
        request(app)
            .delete(`/api/items/${itemId}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(204); 
                done();
            });
    });
});
