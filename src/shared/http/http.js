var getHeader = (headers)=> {
  var defaultHeader = {
    'Content-Type': 'application/json',
  }
  return headers ? headers : defaultHeader;
};
exports.getHeader = getHeader;


exports.get = async (url, opt) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: !opt ? getHeader() : opt.headers,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.post = async (url, data, opt) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: !opt ? getHeader() : opt.headers,
      body: data
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.put = async (url, data, opt) => {
  try {
    let response = await fetch(url, {
      method: 'PUT',
      headers: !opt ? getHeader() : opt.headers,
      body: data
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.delete = async (url, data, opt) => {
  try {
    let response = await fetch(url, {
      method: 'DELETE',
      headers: !opt ? getHeader() : opt.headers,
      body: data
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};
