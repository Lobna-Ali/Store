import jwt from "jsonwebtoken";
import process from "process";

const { TOKEN_SECRET } = process.env;
/**
 * verify Token
 * @param {string} token
 * @returns  Promise<{ err, decoded }>
 */
export const verifyToken = async (token: string): Promise<{ err; decoded }> => {
  return await jwt.verify(token, TOKEN_SECRET, function (err, decoded) {
    return {
      err,
      decoded,
    };
  });
};
/**
 * return token
 * @param ecnryptedData
 * @returns string
 */
export const getToken = (ecnryptedData): string => {
  return jwt.sign({ ...ecnryptedData }, TOKEN_SECRET, {
    expiresIn: "2h",
  });
};
