// const app = require("../app");
// const supertestRequest = require("supertest");

// // console.log("The app required is = ", app);

// // describe a test fixture with multiple test cases
// // eg - 1) success 2) failed
// describe("Test GET  /singer", () => {
//   // tc - 1 -success
//   test("Get Singer should response with 200", async () => {
//     const rw = await supertestRequest(app).get("/singer");
//     expect(rw.status).toBe(200);
//   });
// });
// describe('Test GET /allSongs' , () => {
//   test("Get all songs should return with 200", async () => {
//     const res = await supertestRequest(app).get('/allSongs');
//     expect(res).toBe(200);
//   });
// })