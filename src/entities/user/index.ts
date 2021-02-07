export interface UserEntity {
  id: number;
  uuid: string;
  username: string;
  password: string;
  email: string;
  createdAt: number;
  updatedAt: number;
}

interface buildMakeUserArgs {
  checkPassword: (password: string) => boolean;
}

export default function buildMakeUser({ checkPassword }: buildMakeUserArgs) {
  return function makeUser({
    id,
    uuid,
    username,
    password,
    email,
    createdAt = Date.now(),
    updatedAt = Date.now(),
  }: UserEntity) {
    return Object.freeze({
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getUsername: () => username,
      getEmail: () => email,
      getId: () => id,
      getUuid: () => uuid,
      checkPassword,
    });
  };
}
