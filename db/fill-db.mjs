import fs from "fs";
import { faker } from "@faker-js/faker";
import "dotenv/config";
import pino from "pino";

const MOCK_COUNT = process.env.MOCK_COUNT;
const DB_PATH = process.env.DB_PATH;
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_NUMBER = process.env.TEST_NUMBER;

const logger = pino({ transport: { target: "pino-pretty" } });

const getRandomInt = (length) =>
  +[...Array(length)].map((_) => (Math.random() * 10) | 0).join(``);

const createMockUser = () => {
  const email = faker.internet.email();
  const number = getRandomInt(6);

  return { email, number };
};

const createMockUsers = (count) => {
  const testUser = { email: TEST_EMAIL, number: parseInt(TEST_NUMBER) };
  const users = [
    ...Array(parseInt(count))
  ];

  return [...users.map(createMockUser), testUser, testUser];
};

const json = JSON.stringify(createMockUsers(MOCK_COUNT));

fs.writeFile(DB_PATH, json, "utf8", (err) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`Filled ${DB_PATH} with mock user data!`);
});
