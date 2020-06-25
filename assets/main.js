$(() => {
  $("#pre").hide();
  $("#button").prop("disabled", true);
  $("#button").addClass("is-disabled");

  const client = ZAFClient.init();
  client.invoke("resize", {
    width: "100%",
    height: "380px",
  });

  client
    .get([
      "ticket.customField:custom_field_25050165",
      "ticket.customField:custom_field_26163889",
      "ticket.customField:custom_field_25739049",
      "ticket.customField:custom_field_27941965",
      "ticket.customField:custom_field_26034145",
      "ticket.customField:custom_field_31113289",
      "ticket.customField:custom_field_25376589",
      "ticket.customField:custom_field_27413489",
      "ticket.customField:custom_field_27816469",
      "ticket.customField:custom_field_26268975",
      "ticket.customField:custom_field_25334989",
      "ticket.customField:custom_field_25053145",
      "ticket.tags",
      "ticket.id",
      "ticket.customField:custom_field_26113455",
      "ticket.customField:custom_field_27919705",
      "ticket.customField:custom_field_25309499",
    ])
    .then(
      (data) => {
        const settings = {
          url:
            "https://sandbox.healthwave.ie/geckoboard/zendesk-sms-notifications-testing.php",
          method: "POST",
          timeout: 0,
          headers: {
            Authorization:
              "Basic YVhSQWFHVmhiSFJvZDJGMlpTNXBaVHA2U21sWFpsVjNhVzF3VkUxeGJUSXpOVGQzYjJ4TU9EazRTazA1YzBkVFFYRkhhR0ZDZUhGWjo=",
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            collection_delivery:
              data["ticket.customField:custom_field_25050165"],
            dispatch_date: data["ticket.customField:custom_field_26163889"],
            is_member: data["ticket.customField:custom_field_25739049"],
            name: data["ticket.customField:custom_field_27941965"],
            order_type: data["ticket.customField:custom_field_26034145"],
            owings: data["ticket.customField:custom_field_31113289"],
            paid: data["ticket.customField:custom_field_25376589"],
            payment_method: data["ticket.customField:custom_field_27413489"],
            people_ordering: data["ticket.customField:custom_field_27816469"],
            price_total: data["ticket.customField:custom_field_26268975"],
            source: data["ticket.customField:custom_field_25334989"],
            status: data["ticket.customField:custom_field_25053145"],
            tags: data["ticket.tags"],
            ticket_id: data["ticket.id"],
            tracking: data["ticket.customField:custom_field_26113455"],
            where_is_prescription:
              data["ticket.customField:custom_field_27919705"],
            phone: data["ticket.customField:custom_field_25309499"],
          }),
        };

        $("#button")
          .removeClass("is-disabled")
          .prop("disabled", false)
          .on("click", () => {
            // $(this.Element).addClass("is-loading");
            $("#button").addClass("is-loading");
            console.log(settings.data);
            asyncAjax(settings)
              .then((response) => {
                $("#button").removeClass("is-loading");
                $("#pre").show().html(response);
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          });
      },
      (response) => {
        console.log(response);
      }
    );
});

const showInfo = () => {
  const requester_data = {
    phone_number: "(083) 453 0958",
  };
  const source = $("#requester-template").html();
  const template = Handlebars.compile(source);
  const html = template(requester_data);
  $("#content").html(html);
};

const showError = () => {
  const error_data = {
    status: 404,
    statusText: "Not found",
  };
  const source = $("#error-template").html();
  const template = Handlebars.compile(source);
  const html = template(error_data);
  $("#content").html(html);
};

const requestUserInfo = (client, id) => {
  const settings = {
    url: "/api/v2/users/" + id + ".json",
    type: "GET",
    dataType: "json",
  };

  client.request(settings).then(
    (data) => {
      console.log(data);
    },
    (response) => {
      console.error(response);
    }
  );
};

const asyncAjax = async (settings) => {
  let result;
  try {
    result = await $.ajax(settings);
    return result;
  } catch (error) {
    console.error(error);
  }
};
