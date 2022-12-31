/*
 *
 *
 *
 * DEPARTMENTS
 *
 *
 *
 */
export default [
  {
    name: "Administration",
    code: "ADM",
    divisions: {
      create: [
        { name: "Facilities", code: "ADM-FAC" },

        { name: "Finance", code: "ADM-FNC" },

        { name: "IT/Operations", code: "ADM-IT" },

        { name: "Human Resources", code: "ADM-HR" },
      ],
    },
    positions: {
      create: [
        { name: "Human Resources Manager" },

        { name: "Director of Finance and Administration" },

        { name: "Office Manager" },

        { name: "On-Site Building Manager" },

        { name: "Project Manager" },

        { name: "Chief of Staff" },

        { name: "Accountant" },
      ],
    },
  },
  {
    name: "Advancement",
    code: "ADV",
    divisions: {
      create: [
        { name: "Advancement Operations", code: "ADV-OP" },

        { name: "Development", code: "ADV-DEV" },

        { name: "Marketing", code: "ADV-MKT" },
      ],
    },
    positions: {
      create: [
        { name: "Development Associate" },

        { name: "Director of Advancement" },
      ],
    },
  },
  {
    name: "Artistic",
    code: "ART",
    divisions: {
      create: [
        { name: "Artistic Operations", code: "ART-OP" },

        { name: "Music", code: "ART-MUS" },

        { name: "Afterschool", code: "ART-AS" },

        { name: "Outreach", code: "ART-OUT" },
      ],
    },
    positions: {
      create: [
        {
          name: "Artistic Director",
        },
        {
          name: "Senior Music Director",
        },
        {
          name: "Pianist",
        },
        {
          name: "Artistic Producer",
        },
        {
          name: "Artistic Associate",
        },
        {
          name: "Program Music Director",
        },
        {
          name: "Musician",
        },
        {
          name: "Dance Instructor",
        },
      ],
    },
  },
  {
    name: "Office of the Executive Director",
    code: "OED",
    divisions: {
      create: [
        { name: "Department Operations", code: "OED-OP" },

        { name: "Board", code: "OED-BRD" },
      ],
    },
    positions: {
      create: [
        { name: "Executive Director" },
        { name: "Assistant to the Executive Director" },
      ],
    },
  },
];
