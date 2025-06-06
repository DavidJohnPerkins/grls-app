(async () => {
    const response = await fetch('http://localhost:8080/');
    const body = await response.text();
    console.log(body);
})();
