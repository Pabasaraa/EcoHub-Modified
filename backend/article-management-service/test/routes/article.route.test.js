const app = require("../../../server");
const supertest = require("supertest");

require("dotenv").config();

const request = supertest(app);

// test for get all articles
describe("Test the get article", () => {
    test("It should response the GET method", async () => {
        const response = await request.get("/articles/get/all");

        expect(response.statusCode).toBe(200);
    });
});

// test for get article by id
describe("Test the get article by id path", () => {
    test("It should response the GET method", async () => {
        const response = await request.get("/articles/646d2132c9cc1184746b6c2f");

        expect(response.statusCode).toBe(200);
    });
});

// test for add article
describe("Test the add article", () => {
    test("It should response the POST method", async () => {
        const response = await request.post("/articles/new").send({
            
                // Provide valid request body data for creating a new article
                adminId: '0734' ,
                articleTitle: 'sample title',
                articleAuthor: 'sample author',
                articleDescription: 'sample description',
                articleContent:[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                    // Add more content strings as needed
                  ],
               dateOfPublication: new Date(),
              });
      
            expect(response.status).toBe(200);
    });
});



// test for delete article
describe("Test the delete article", () => {
    test("It should response the DELETE method", async () => {
        const response = await request.delete("/delete/646d2132c9cc1184746b6c2f");

        expect(response.statusCode).toBe(200);
    });
});
