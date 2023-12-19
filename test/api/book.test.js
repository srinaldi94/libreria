const request = require('supertest'); //permite realizar peticiones http
const app = require('../../app');

describe('book', () => {
    let server;
    const port = 3000;

    const book = {
        title: 'Del amor y otros demonios',
        pages: 402,
        year: 1962,
        isbn: "223-456-7890-A1",
        author: 'Gabriel Garcia Marquez'
    }

    beforeAll((done) => {
        server = app.listen(port);
        done();
    });

    afterAll((done) => {
        server.close();
        done();
    });

    test('should get all books', async () => {
        const res = await request(server)
                    .get('/api/v1/book/list');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining({listBooks: expect.any(Array)}))
    });

    test('should get all books', async () => {
        const res = await request(server)
                    .post('/api/v1/book/create')
                    .send(book);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({status:true, message: 'Book saved!'});
    });

    test('should get book by isbn', async () => {
        const res = await request(server)
                    .get(`/api/v1/book/${book.isbn}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({status:true, book});
    });

    test('should update a book and return a message', async () => {
        const res = await request(server)
                    .put(`/api/v1/book/update/${book.isbn}`)
                    .send({
                        title:'El morado',
                    });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({status:true, message: 'Book updated!'});
    });

    test('should delete book by isbn', async () => {
        const res = await request(server)
                    .delete(`/api/v1/book/delete/${book.isbn}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({status:true, message: 'Book deleted!'});
    });




})