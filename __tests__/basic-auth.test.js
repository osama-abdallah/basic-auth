const basicMid = require("../src/auth/middleware/basic");
const supertest = require('supertest');
const base64 = require('base-64');

describe('testing basic', ()=>{

let req={headers:{authorization:``}}
let res={}
let next=jest.fn()

it("testing not autherised", async()=>{
   await basicMid(req,res, next)
    expect(next).toHaveBeenCalledWith("Not Autherised")
})
})