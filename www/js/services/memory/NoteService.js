var NoteService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        var successCallback = function(notes) {
          this.notes = notes;
          deferred.resolve();
        }

        $.getJSON("http://whatsmywage.org/api/v1/survey/note", successCallback.bind(this));

        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var note = null;
        var l = this.notes.length;
        for (var i=0; i < l; i++) {
            if (this.notes[i].id == id) {
                note = this.notes[i];
                break;
            }
        }
        deferred.resolve(note);
        return deferred.promise();
    }
}

