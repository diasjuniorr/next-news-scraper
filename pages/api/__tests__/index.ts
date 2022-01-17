import request from "supertest";
import http, { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/server/api-utils";
import handler from "../articles/index";

process.env.ECONOMIST_URL = "https://www.economist.com/";

describe("Testing if the scraping strategy still works", () => {
  const apiPreviewPropsMock = {
    previewModeId: "id",
    previewModeEncryptionKey: "key",
    previewModeSigningKey: "key",
  };

  const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    apiResolver(req, res, undefined, handler, apiPreviewPropsMock, false);
  };

  const headlinesCount = 7;
  const discoversCount = 3;
  const favoritesCount = 5;
  const sectionsCount = 8;
  const sectionsListCount = 3;

  it("Should return all the elements the home page expects", async () => {
    const server = http.createServer(requestListener);
    const response = await request.agent(server).get("/api/articles");

    expect(response.body.headlines.length).toEqual(headlinesCount);
    expect(response.body.discovers.length).toEqual(discoversCount);
    expect(response.body.favorites.length).toEqual(favoritesCount);
    expect(response.body.sections.length).toEqual(sectionsCount);

    for (let i = 0; i < sectionsCount; i++) {
      expect(response.body.sections[i].sectionArticles.length).toEqual(sectionsListCount);
    }
    server.close();
  });

  it("Should return href and title for all elements", async () => {
    const server = http.createServer(requestListener);
    const response = await request.agent(server).get("/api/articles");

    for (let i = 0; i < headlinesCount; i++) {
      console.log("DEBUG: ", response.body);
      expect(response.body.headlines[i].href).toBeTruthy();
      expect(response.body.headlines[i].title).toBeTruthy();
    }

    for (let i = 0; i < discoversCount; i++) {
      expect(response.body.discovers[i].href).toBeTruthy();
      expect(response.body.discovers[i].title).toBeTruthy();
    }

    for (let i = 0; i < favoritesCount; i++) {
      expect(response.body.favorites[i].href).toBeTruthy();
      expect(response.body.favorites[i].title).toBeTruthy();
    }

    for (let i = 0; i < sectionsCount; i++) {
      expect(response.body.sections[i].sectionTitle).toBeTruthy();
      for (let j = 0; j < sectionsListCount; j++) {
        expect(response.body.sections[i].sectionArticles[j]).toBeTruthy();
      }
    }

    server.close();
  });
});
