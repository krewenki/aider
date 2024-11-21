document.addEventListener('DOMContentLoaded', function () {
  var ctx = document.getElementById('quantChart').getContext('2d');
  var chartData = {
    labels: [],
    datasets: [{
      label: 'Percent completed correctly',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  var allData = [];
  {% for row in site.data.quant %}
    allData.push({
      model: '{{ row.model }}',
      pass_rate_2: {{ row.pass_rate_2 }}
    });
  {% endfor %}

  allData.forEach(function(row) {
    // Split model name on \n and join with actual line breaks
    chartData.labels.push(row.model.split('\\n').join('\n'));
    chartData.datasets[0].data.push(row.pass_rate_2);
  });

  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Aider coder editing benchmark'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percent completed correctly'
          }
        }
      }
    }
  });
});
