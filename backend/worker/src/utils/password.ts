type hashPasswordResponse = {
  hashedPassword: string;
};

export const hashPassword = async function (body: {
  password: string;
}): Promise<hashPasswordResponse> {
  const response = await fetch("https://write-verse.onrender.com/hash", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const verifyPassword = async function (body: {
  password: string;
  hashedPassword: string;
}): Promise<{ isValid: boolean }> {
  const response = await fetch("https://write-verse.onrender.com/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
