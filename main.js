//bài 1
function consoleLog(item) {
    alert(item);
}

function forEachTest(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]);
    }
}

function btn1() {
    const bai1 = document.getElementById("bai1").value;
    const array = bai1.split(",");
    forEachTest(array, consoleLog);
}

//bài 2
function forEachPair(array, callback) {
    for (let i = 0; i < array.length - 1; i++) {
        const sum = array[i] + array[i + 1];
        callback(sum);
    }
}

function btn2() {
    const bai2 = document.getElementById("bai2").value;
    const array = bai2.split(",").map(Number);
    forEachPair(array, consoleLog);
}

//bài 3
const result = document.getElementById("result");

const randomPromise = new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (randomNumber !== undefined) {
        resolve(randomNumber);
    } 
    else {
        reject("Không thể tạo số ngẫu nhiên.");
    }
});

randomPromise
    .then((number) => {
        result.textContent = `Số ngẫu nhiên: ${number}`;
    })
    .catch((error) => {
        result.textContent = `Lỗi: ${error}`;
    });

function reloadPage() {
    location.reload();
}

//bài 4
function getEvenNumbers(array) {
    return new Promise((resolve, reject) => {
        const evenNumbers = array.filter(num => num % 2 === 0);
        if (evenNumbers.length > 0) {
            resolve(evenNumbers);
        } 
        else {
            reject("Lỗi: Không tìm thấy số chẵn.");
        }
    });
}

function btn4() {
    const input = document.getElementById("bai4").value;
    const array = input.split(",").map(Number);
    getEvenNumbers(array)
        .then(result => {
            alert("Các số chẵn là: " + result.join(", "));
        })
        .catch(error => {
            alert(error);
        });
}

//bài 5
let isOpen = false;
function loadCountries() {
    const container = document.getElementById("countries");
    const btn = document.getElementById("btn");

    if (isOpen) {
        container.innerHTML = "";
        btn.textContent = "Hiển thị danh sách quốc gia";
        isOpen = false;
        return;
    }

    btn.textContent = "X";
    container.innerHTML = "Đang tải dữ liệu...";

    fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
        .then(res => res.json())
        .then(countries => {
            const html = countries.map(country => {
                const flag = country.flags?.png || "";
                const name = country.name?.common || "Unknown";
                const capital = country.capital?.[0] || "N/A";

                return `
                    <div class="country">
                        <img src="${flag}" alt="${name}">
                        <p>${capital} - ${name}</p>
                    </div>
                `;
            }).join("");

            container.innerHTML = html;
            isOpen = true;
        })
        .catch(err => {
            container.innerHTML = "Không tải được dữ liệu";
            console.error(err);
        });
}

//bài 6
function getIP() {
    const ipBox = document.getElementById("ip");
    ipBox.textContent = "Đang lấy IP...";

    fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
            ipBox.textContent = "IP của bạn là: " + data.ip;
        })
        .catch(() => {
            ipBox.textContent = "Không lấy được IP";
        });
}