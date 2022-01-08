const Treatment = require('../models/treatment-model');
const Client = require('../models/client-model');
const { Chart } = require('chart.js');
const inquirer = require('inquirer');
const controller = {};

controller.draw = async(req, res) => { //Envíar los graficos/datos necesarios para el dashboard
    await Dashboard(res);
}

function getClients() { //Obtener todos los clientes registrados en la base de datos
    return new Promise((resolve) => {
        const client = Client.find({}).lean();
        resolve(client)
    });
}

async function getTreatments(clients) { // Obtener los tratamiento por CLIENTE
    const arr_treatments = [];
    for (const client of clients) {
        const treatment = await Treatment.find({ identification_number: client.identification_number }).lean();
        arr_treatments.push(treatment);
    }
    return arr_treatments;
}

async function CT_Graph() { //CT = Customer-Treatment 
    const clients = await getClients();
    const treatments = await getTreatments(clients);

    const x = [];
    const y = [];

    for (client of clients) {
        x.push(client.identification_number);
    }

    for (treatment of treatments) {
        y.push(treatment.length)
    }

    return [x, y];
}

async function FI_Graph() {
    const clients = await getClients();
    const treatments = await getTreatments(clients);

    const x = [];
    const y = [];

    for (treatment of treatments) {
        for (element of treatment) {
            if (y.includes(element.end_date)) {
                const index = y.indexOf(element.end_date);
                x[index] = x[index] + parseInt(element.cost)
            } else {
                y.push(element.end_date);
                x.push(parseInt(element.cost));
            }
        }
    }
    return [x, y];
}

async function NTT_Graph() {
    const clients = await getClients();
    const treatments = await getTreatments(clients);

    const x = [];
    const y = [];

    for (treatment of treatments) {
        for (element of treatment) {
            if (x.includes(element.description)) {
                const index = x.indexOf(element.description);
                y[index] = y[index] + 1;
            } else {
                x.push(element.description);
                y.push(1);
            }
        }
    }

    const best_treatment = Math.max(...y);
    const treatm = x[y.indexOf(best_treatment)];

    return [x, y, treatm];
}

async function Dashboard(res) {

    const dataCT = await CT_Graph();
    const dataFI = await FI_Graph();
    const dataNTT = await NTT_Graph();
    const x = dataCT[0];
    const y = dataCT[1];

    const x1 = dataFI[0];
    const y1 = dataFI[1];

    const x2 = dataNTT[0];
    const y2 = dataNTT[1];
    const m2 = dataNTT[2];

    //console.log("El mejor tratamiento en la clinica es: " + m2);

    const fs = first_graph(x, y);
    const ss = second_graph(x1, y1);
    const ts = third_graph(x2, y2);
    fourth_graph(y1, x1);

    scripts = "<script>" + fs + "\n" + ss + "\n" + ts + "</script>"

    res.render('dashboard/dashboard-panel', { chartjs: '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.js" integrity="sha512-uLlukEfSLB7gWRBvzpDnLGvzNUluF19IDEdUoyGAtaO0MVSBsQ+g3qhLRL3GTVoEzKpc24rVT6X1Pr5fmsShBg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>', script: scripts, css: '<link rel="stylesheet" href="/css/main.css">\n<link rel="stylesheet" href="/css/dashboard/dashboard.css">' });
}

function first_graph(x, y) {
    _x = []

    for (label of x) {
        _x.push("'" + label + "'");
    }

    const script =
        `const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [${_x}],
                    datasets: [{
                        label: '# of Treatments',
                        data: [${y}],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }); 

        myChart.resize(400,400);`;

    return script;
}

function second_graph(x, y) {

    _y = [];

    for (label of y) {
        _y.push("'" + label + "'");
    }

    const script =
        `const ctx1 = document.getElementById('myChart1').getContext('2d');
        const myChart1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: [${_y}],
                datasets: [{
                    label: '# of Treatments',
                    data: [${x}],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }); 

        myChart1.resize(400,400);`;

    return script;
}

function third_graph(x, y) {

    _x = [];

    for (label of x) {
        _x.push("'" + label + "'");
    }

    const script =
        `const ctx2 = document.getElementById('myChart2').getContext('2d');
        const myChart2 = new Chart(ctx2, {
            type: 'polarArea',
            data: {
                labels: [${_x}],
                datasets: [{
                    label: '# of Treatments',
                    data: [${y}],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }); 

        myChart1.resize(400,400);`;

    return script;
}

async function fourth_graph(fechas, ganancias) {

    const fechas_ordenadas = fechas.sort();

    console.log(fechas_ordenadas);

    const question1 = {
        type: 'input',
        name: 'sd',
        message: "Fecha Inicio: ",
    };

    const question2 = {
        type: 'input',
        name: 'ed',
        message: "Fecha Fin: ",
    };

    const questions = [question1, question2];

    const answers = await inquirer.prompt(questions).then(answers => {
        return answers;
    });

    let sd = answers['sd'];
    let ed = answers['ed'];

    let ganancia = 0;

    for (fecha of fechas_ordenadas) {
        while (fecha >= sd && fecha <= ed) {
            const index = fechas.indexOf(fecha);
            ganancia += ganancias[index];
            break;
        }
    }

    console.log(`Las ganancias en el rango fueron: ${ganancia}$`);
}

module.exports = controller;