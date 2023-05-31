module.exports = {
  createUserAccount: (data) => [
    data.first_name,
    data.last_name,
    data.email,
    data.branch_id,
    data.role_id,
    data.hashed,
    data.salt,
  ],
};
