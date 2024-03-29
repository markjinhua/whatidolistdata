import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { resetPassword } from "../../actions/auth";
import { withRouter } from "react-router-dom";

const form = reduxForm({
  form: "resetPassword",
});

const renderField = (field) => (
  <div>
    <input type="password" className="form-control" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

class ResetPassword extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  UNSAFE_componentWillMount() {
    if (this.props.authenticated) {
      this.context.router.push("/dashboard");
    }
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.context.router.push("/dashboard");
    }
  }

  handleFormSubmit({ password }) {
    const resetToken = this.props.match.params.resetToken;
    this.props.resetPassword(resetToken, { password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    } else if (this.props.message) {
      return (
        <div className="alert alert-success">
          <strong>Success!</strong> {this.props.message}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="reset_form">
        <form
          id="reset_form"
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <fieldset className="form-group">
            <label>New Password:</label>
            <Field name="password" component={renderField} type="password" />
          </fieldset>
          <fieldset className="form-group">
            <label>Confirm New Password:</label>
            <Field
              name="passwordConfirm"
              component={renderField}
              type="password"
            />
            {/* {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>} */}
          </fieldset>

          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    errorMessage: state.auth.resetErrorMessage,
    message: state.auth.resetMessage,
  };
}

export default connect(mapStateToProps, { resetPassword })(withRouter(form(ResetPassword)));
