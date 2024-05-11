import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";
import Pagination from "react-bootstrap/Pagination";

const Pages = () => {
  const { deviceStore } = useContext(Context);
  const pageCount = Math.ceil(deviceStore.totalCount / deviceStore.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination className="mt-3">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => deviceStore.setPage(page)}
          active={deviceStore.page === page}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default observer(Pages);
