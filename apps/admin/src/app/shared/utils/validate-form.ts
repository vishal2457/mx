export const validateForm = (formControls) => {
  for (const field in formControls) {
    const control = formControls[field];
    control.markAllAsTouched({ onlySelf: true });
  }
};
