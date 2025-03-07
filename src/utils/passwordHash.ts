import argon2 from "argon2-browser";

export const hashPassword = async function (password: string) {
  try {
    const salt = new Uint8Array(16);
    const result = await argon2.hash({
      salt: salt,
      pass: password,
    });
    return result.encoded;
  } catch (error) {
    console.error("Unable to hash password", error);
    return error;
  }
};

export const verifyPassword = async function (
  hashedPassword: string,
  password: string
) {
  try {
    await argon2.verify({
      pass: password,
      encoded: hashedPassword,
    });

    return true;
  } catch (error) {
    console.error("Password does not match", error);
    return false;
  }
};
