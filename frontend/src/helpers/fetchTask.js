const fetchTask = async id => {
  try {
    const response = await fetch(`/api/tasks/${id}`);

    if (!response.ok) {
      throw new Error(`Oops, ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    throw err;
  }
};

export { fetchTask };
