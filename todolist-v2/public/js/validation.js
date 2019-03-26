String.prototype.camelCase = function() {
  // @todo - Tokenise with delim ' ' - Start every word with lower case and then remove white spaces
  // concat all words to one string.
  return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);
}

String.prototype.removeWhiteSpace = function() {
  return this.replace(/\s/g, "");
}

String.prototype.removeTags = function() {
  return this.replace(/(<([^>]+)>)/ig, "");
}


function validateInput(input, fname = 'fieldname', limit = 32) {
  if (input.length <= 0 || input.length > limit) {
    throw Error("Size of field '" + fname + "' not within limits - 1 to " + limit + ' chars');
  }
  return input;
}


function validateFormText(inputTag) {
  return validateInput(inputTag.value, inputTag.name, inputTag.size);
}

function validateToDoForm(formValidate) {
  formValidate.todo.value = formValidate.todo.value.trim().removeTags();
  try {
    if (formValidate.todo.value.length == 0) {
      return false;
    } else {
      formValidate.todo.value = validateFormText(formValidate.todo);
      return true;
    }
  } catch (e) {
    alert(e);
    return false;
  }
}
