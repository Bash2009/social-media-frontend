import { type ProfileData, type ProfileErrors } from "./types";

interface Props {
  data: ProfileData;
  errors: ProfileErrors;
  touched: { firstName?: boolean; lastName?: boolean; username?: boolean };
  onChange: (field: keyof ProfileData, value: string) => void;
  onBlur: (field: "firstName" | "lastName" | "username") => void;
}

const StepIdentity = ({ data, errors, touched, onChange, onBlur }: Props) => (
  <div className="setup-step-body">
    <h2 className="setup-title">Your identity</h2>
    <p className="setup-desc">How others will find and recognise you.</p>

    <div className="row g-2 mb-3">
      <div className="col form-floating">
        <input
          type="text"
          id="p_firstname"
          placeholder=""
          className={`form-control ${touched.firstName ? (errors.firstName ? "is-invalid" : "is-valid") : ""}`}
          value={data.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          onBlur={() => onBlur("firstName")}
        />
        <label htmlFor="p_firstname">First name <span className="text-danger">*</span></label>
        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
      </div>

      <div className="col form-floating">
        <input
          type="text"
          id="p_lastname"
          placeholder=""
          className={`form-control ${touched.lastName ? (errors.lastName ? "is-invalid" : "is-valid") : ""}`}
          value={data.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          onBlur={() => onBlur("lastName")}
        />
        <label htmlFor="p_lastname">Last name <span className="text-danger">*</span></label>
        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
      </div>
    </div>

    <div className="form-floating">
      <input
        type="text"
        id="p_username"
        placeholder=""
        className={`form-control ${touched.username ? (errors.username ? "is-invalid" : "is-valid") : ""}`}
        value={data.username}
        onChange={(e) => onChange("username", e.target.value.toLowerCase().replace(/\s/g, ""))}
        onBlur={() => onBlur("username")}
      />
      <label htmlFor="p_username">Username <span className="text-danger">*</span></label>
      {errors.username
        ? <div className="invalid-feedback">{errors.username}</div>
        : <div className="form-text ps-1">Letters, numbers, _ and . · 3–20 chars</div>}
    </div>
  </div>
);

export default StepIdentity;
