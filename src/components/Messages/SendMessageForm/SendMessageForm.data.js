import * as Yup from "yup";
// id               :bigint           not null, primary key
// #  body             :text
// #  created_at       :datetime         not null
// #  updated_at       :datetime         not null
// #  user_receiver_id :bigint           not null
// #  user_sender_id   :bigint           not null

export function initialValues() {
  return {
    body: "",
    createdAt: "",
    updatedAt: "",
    userReceiverId: "",
    userSenderId: "",
    photoMessage: "",
  };
}
export function validationSchema() {
  return Yup.object({
    body: Yup.string(),
    photoMessage: Yup.object().test(
      "empty-or-photo",
      "Debe tener al menos un carácter o una foto",
      function (value) {
        const { body } = this.parent; // Obtener el valor del campo "body"
        // Validar que "body" tenga al menos un carácter o que "photoMessage" contenga una foto seleccionada
        return !!body?.trim() || value;
      }
    ),
  });
}
