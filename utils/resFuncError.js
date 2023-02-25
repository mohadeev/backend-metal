const resFuncError = (res, errorMessage) => {
  res.json({ errorMessage });
};

export default resFuncError;
