
import request from 'supertest'
import http, { IncomingMessage, ServerResponse } from 'http'
import { apiResolver } from 'next/dist/server/api-utils'
import handler from "../articles/index"

process.env.ECONOMIST_URL = "https://www.economist.com/"
process.env.ECONOMIST_URL = "teste"

describe("should return items", ()=>{

  const apiPreviewPropsMock = {
    previewModeId: 'id',
    previewModeEncryptionKey: 'key',
    previewModeSigningKey: 'key',
  }

  const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    apiResolver(req, res, undefined, handler, apiPreviewPropsMock, false)
  }

  it('Should return 200 to a valid request', async () => {
    const server = http.createServer(requestListener)
    const response = await request
      .agent(server)
      .get('/api/articles')


    expect(response.statusCode).toEqual(200)
    server.close()
  })

})