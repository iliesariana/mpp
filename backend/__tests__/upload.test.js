const request = require("supertest");
const express = require("express");
const path = require("path");
const fs = require("fs");
const uploadRouter = require("../fileRoutes"); // adjust path if needed

const app = express();
app.use(express.json());
app.use("/upload", uploadRouter);

describe("File Upload", () => {
  const testFilePath = path.join(__dirname, "dummy.txt");

  beforeAll(() => {
    fs.writeFileSync(testFilePath, "This is a test file");
  });

  afterAll(() => {
    if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
  });

  it("uploads a file and responds with filename, message, and url", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", testFilePath);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("filename");
    expect(res.body).toHaveProperty("message", "File uploaded successfully");
    expect(res.body).toHaveProperty("url");

    const uploadedFilePath = path.join(__dirname, "..", "uploads", res.body.filename);
    expect(fs.existsSync(uploadedFilePath)).toBe(true);

    fs.unlinkSync(uploadedFilePath); // clean up after test
  });
});
