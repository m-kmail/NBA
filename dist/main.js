const render = function (data) {
  $(".team").empty();
  const src = $("#playerGenerator").html();
  const template = Handlebars.compile(src);
  let somehtml = template({ data });
  $(".team").append(somehtml);
};

const getit = function () {
  const teamName = $("#in").val();

  $.get(`/teams/${teamName}`, function (data) {
    console.log(data);
    render(data);
  });
};
