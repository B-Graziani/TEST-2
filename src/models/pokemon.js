const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "le nom est deja pris !",
        },
        validate: {
          notEmpty: { msg: "Ne doit pas etre vide" },
          notNull: { msg: "propriété requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "utilisez uniquement des nombres entier" },
          notNull: { msg: "propriété requise " },
          min: {
            args: [0],
            msg: "point de vie superieur ou egal à 0",
          },
          max: { args: [999], msg: "point de vie inferieur ou egal a 999" },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "utilisez uniquement des nombres entier" },
          notNull: { msg: "propriété requise " },
          min: {
            args: [0],
            msg: "point de vie superieur ou egal à 0",
          },
          max: { args: [99], msg: "point de vie inferieur ou egal a 99" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "use an valid url" },
          notNull: { msg: "propriete requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("un pokemon doit avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error("un pokemon ne peut avoir plus de trois type");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `le type d un pokemon doit aoppartenir a la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updated: false,
    }
  );
};
