// export const respCode = {
//   CP_ALREADY_EXIST: "channel-partner-already-exist",
//   CP_NOT_FOUND: "channel-partner-not-found",
//   CP_NOT_VERIFIED: "channel-partner-not-verified",
//   CP_VERIFIED: "channel-partner-verified",
//   CP_REGISTERED: "channel-partner-registered",
//   LOGIN_SUCCESS: "login-successful",
//   LOGIN_FAILED: "login-failed",
//   OTP_RESENT_SUCCESS: "otp-resent-success",
//   INVALID_OTP_SUCCESS: "otp-resent-invalid",
//   OTP_MATCHED: "otp-resent-matched",
//   OTP_SENT_SUCCESS: "otp-sent-success",
//   PASSWORD_RESET_SUCCESS: "password-reset-success",
//   FIELDS_EMPTY: "field-is-empty",
//   PASSWORD_NOT_MATCHED: "password-not-matched",
//   PASSWORD_MIN_LENGTH_ERROR: "password-min-length-error",
// };

export const errorMessage = {
  EMP_NOT_FOUND:
    "We were unable to find an employee associated with the provided information.",
  EMP_INFO_UPDATED:
    "Successfully updated the employee details for the specified information.",
  EMP_DELETED:
    "Employee information has been successfully removed for the given ID.",
  EMP_EMAIL_EXIST: "An employee with this email address is already registered.",
  EMP_REGISTER_SUCCESS: "Your registration as an employee is complete.",
  EMP_EMAIL_NOT_EXIST:
    "The email address does not match any registered employee.",
  INVALID_PASS: "The passwords do not match. Please try again.",
  EMP_LOGIN_SUCCESS: "Welcome back! You have logged in successfully.",
};

export const employeePopulateOptions = [
  {
    path: "designation",
  },
  {
    path: "department",
  },
  {
    path: "division",
  },
  {
    path: "reportingTo",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      { path: "department" },
      { path: "division" },
    ],
  },
];
export const clientPopulateOptions = [
  {
    path: "projects",
    select: "name",
  },
  {
    path: "projects",
    select: "name",
  },
  {
    path: "closingManager",
    select: "-password -refreshToken",
    populate: [
      { path: "designation" },
      { path: "department" },
      { path: "division" },
    ],
  },
];

export const leadPopulateOptions = [
  {
    path: "channelPartner",
    select: "-password -refreshToken",
  },
  {
    path: "project",
    select: "name",
  },
  {
    path: "teamLeader",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "cycle.teamLeader",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "dataAnalyzer",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "preSalesExecutive",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "approvalHistory.employee",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "updateHistory.employee",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "cycleHistory.teamLeader",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "callHistory.caller",
    select: "firstName lastName",
    populate: [{ path: "designation" }],
  },
  {
    path: "visitRef",
    populate: [
      { path: "projects", select: "name" },
      { path: "location", select: "name" },
      {
        path: "closingManager",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "attendedBy",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "dataEntryBy",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "closingTeam",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
    ],
  },
  {
    path: "revisitRef",
    populate: [
      { path: "projects", select: "name" },
      { path: "location", select: "name" },
      {
        path: "closingManager",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "attendedBy",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "dataEntryBy",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "closingTeam",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
    ],
  },
  {
    path: "bookingRef",
    populate: [
      { path: "project", select: "name" },
      {
        path: "closingManager",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "postSaleExecutive",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
    ],
  },
];

export const meetingPopulateOptions = [
  {
    path: "project",
    select: "name",
  },
  {
    path: "place",
  },
  {
    path: "customer",
    select: "-password",
    populate: [
      { path: "projects", select: "name" },
      {
        path: "closingManager",
        select: "firstName lastName",
        populate: [
          { path: "designation" },

          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
    ],
  },
  {
    path: "meetingWith",
    select: "firstName lastName",
    populate: [
      { path: "designation" },

      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "postSaleBooking",
    populate: [
      { path: "project", select: "name" },
      {
        path: "closingManager",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "postSaleExecutive",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
    ],
  },
  {
    path: "lead",
    populate: [
      {
        path: "channelPartner",
        select: "-password -refreshToken",
      },
      {
        path: "project",
        select: "name",
      },
      {
        path: "teamLeader",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "cycle.teamLeader",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "dataAnalyzer",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "preSalesExecutive",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "approvalHistory.employee",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "updateHistory.employee",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "callHistory.caller",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
];

export const paymentPopulateOptions = [
  {
    path: "projects",
    select: "name",
  },
];

export const postSalePopulateOptions = [
  { path: "project", select: "name" },
  {
    path: "closingManager",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "postSaleExecutive",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
];

export const siteVisitPopulateOptions = [
  { path: "projects", select: "name" },
  { path: "location", select: "name" },
  {
    path: "closingManager",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "attendedBy",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "dataEntryBy",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "closingTeam",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
];

export const taskPopulateOptions = [
  {
    path: "lead",
    populate: [
      {
        path: "channelPartner",
        select: "-password -refreshToken",
      },
      {
        path: "project",
        select: "name",
      },
      {
        path: "teamLeader",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "cycle.teamLeader",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "dataAnalyzer",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "preSalesExecutive",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "approvalHistory.employee",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "updateHistory.employee",
        select: "firstName lastName",
        populate: [
          { path: "designation" },
          {
            path: "reportingTo",
            select: "firstName lastName",
            populate: [{ path: "designation" }],
          },
        ],
      },
      {
        path: "callHistory.caller",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "assignBy",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
  {
    path: "assignTo",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
];

export const attendancePopulateOption = [
  {
    path: "userId",
    select: "firstName lastName",
    populate: [
      { path: "designation" },
      {
        path: "reportingTo",
        select: "firstName lastName",
        populate: [{ path: "designation" }],
      },
    ],
  },
];
