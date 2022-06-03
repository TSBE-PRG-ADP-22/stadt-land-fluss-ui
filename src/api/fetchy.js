const fetchy = async (endpoint, method, body) => {

  const response = await fetch(`${process.env.REACT_APP_API}${endpoint}`, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const status = response.status;
  const data = await response.json();

  return {
    status,
    data,
  };
};

export default fetchy;
