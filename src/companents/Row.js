import React from "react";
import { Box } from "./Box";

export const Row = ({ row, r_i }) => {
  return (
    <div className="row">
      {row.map((type, c_i) => {
        if (r_i % 2 == 1) {
          if (c_i % 2 == 1) {
            return (
              <Box key={c_i} color="rgb(248, 214, 163)" c_i={c_i} r_i={r_i} type={type} />
            );
          } else {
            return (
              <Box key={c_i} color="rgb(133, 97, 31)" c_i={c_i} r_i={r_i} type={type} />
            );
          }
        } else {
          if (c_i % 2 == 1) {
            return (
              <Box key={c_i} color="rgb(133, 97, 31)" c_i={c_i} r_i={r_i} type={type} />
            );
          } else {
            return (
              <Box key={c_i} color="rgb(248, 214, 163)" c_i={c_i} r_i={r_i} type={type} />
            );
          }
        }
      })}
    </div>
  );
};
