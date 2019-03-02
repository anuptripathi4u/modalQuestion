var modalQuestion = function() {

    var callbackHolder;
    var multi;

    var callbackWrapper = function () {
        $('#questionModal').on('hidden.bs.modal', function () {
            callbackHolder(getSelections(multi));
            $('#questionModal').remove();
        });
        $('#questionModal').modal('hide');
    };

    var ask = function (question, options, multiChoice, callback) {
        callbackHolder = callback;
        multi = multiChoice;

        var options = options.map(function(option) {
            return getOptionHtml(option.value, option.label, multiChoice);
        });

        var modalHtml = '\
            <div id="questionModal" class="modal" tabindex="-1" role="dialog">\
              <div class="modal-dialog" role="document">\
                <div class="modal-content">\
                  <div class="modal-header">\
                    <h4 class="modal-title">' + question + '</h4>\
                  </div>\
                  <div class="modal-body">'
                    + options.join('\n') + '\
                  </div>\
                  <div class="modal-footer">\
                    <button type="button" class="btn btn-primary" onclick="modalQuestion.callbackWrapper()">OK</button>\
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
                  </div>\
                </div>\
              </div>\
            </div>';

        $('body').append(modalHtml);
        $('#questionModal').modal('show');
    };
    
    function getOptionHtml(value, label, multiChoice) {
        return '<p class="form-control-static">' +
                '<input type="' + (multiChoice ? 'checkbox' : 'radio') +
                '" name="modalQuestions" value="' + value + '"/> ' + label +
                '</p>';
    }
    
    function getSelections(multiChoice) {
        if (multiChoice) {
            var values = [];
            $(":input:checked", "#questionModal").map(function(i, item) {
                values.push(item.getAttribute('value'));
            });
            
            return values.length ? values : undefined;
        } else {
            var choice = $(":input:checked", "#questionModal");
            return choice.length > 0 ? choice[0].getAttribute('value') : undefined;
        }
    }

    return {
        ask: ask,
        callbackWrapper: callbackWrapper
    };
}();