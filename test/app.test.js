const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () =>{
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res =>{
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const cApp = res.body[0];
            expect(cApp).to.include.all.keys(
                "App", "Category", "Rating", "Reviews", "Size", "Installs", "Type",  "Price",  "Content Rating", "Genres",  "Last Updated", "Current Ver", "Android Ver"
            );
        });
    });

    it('should be 400 if sort is incorrect', () =>{
        return supertest(app)
        .get('/apps')
        .query({sort: 'MISTAKE'})
        .expect(400, 'sort must be one of rating and app');
    });

    it('should sort by App', () =>{
        return supertest(app)
        .get('/apps')
        .query({sort: 'App'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res =>{
            expect(res.body).to.be.an('array');
            let sorted = true;
            let i = 0;
            // iterate once less than the length of the array
        // because comparing 2 items in the array at a time

        while(i< res.body.length - 1){
            // compare book at 'i' with next book at 'i+1'
            const appAtI = res.body[i];
            const appAtIPlus1 = res.body[i+1];
            //if the next book is less than the book at i
            if(appAtIPlus1.App < appAtI.App){
                // the books were not sorted correctly
                sorted = false;
                break; // exit the loop
            }
            i++;
        }
        expect(sorted).to.be.true;
        });
    });

    it('should sort by Rating', () =>{
        return supertest(app)
        .get('/apps')
        .query({sort: 'Rating'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res =>{
            expect(res.body).to.be.an('array');
            let sorted = true;
            let i = 0;
            // iterate once less than the length of the array
        // because comparing 2 items in the array at a time

        while(i< res.body.length - 1){
            // compare book at 'i' with next book at 'i+1'
            const ratingAtI = res.body[i].Rating;
            const ratingAtIPlus1 = res.body[i+1].Rating;
            //if the next book is less than the book at i
            if(ratingAtIPlus1 < ratingAtI){
                // the books were not sorted correctly
                sorted = false;
                break; // exit the loop
            }
            i++;
        }
        expect(sorted).to.be.true;
        });
    });
});