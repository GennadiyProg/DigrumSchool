import React, {FC, useEffect, useRef, useState} from 'react';
import {AppSearchBody, AppSearchHeader, AppSearchWrapper} from "./AppSearch.styled";
import {AppInput} from "../AppInput";
import {Button, useTheme} from "@mui/material";
import {AppSimpleTable} from "../AppSimpleTable";
import {useComponentVisible} from "../../hooks/useComponentVisible";

interface AppSearchProps {
  trigger: (value: string) => void,
  body?: Object[],
  showSearchButton?: boolean,
  immediate?: boolean,
  itemChosen?: (obj: any) => void,
}

export const AppSearch:FC<AppSearchProps> = ({
                                               trigger,
                                               body,
                                               showSearchButton= false,
                                               immediate= true,
                                               itemChosen,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const theme = useTheme()
  const {ref: searchWrapperRef, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const onType = (v: string) => {
    immediate && trigger(v)
    setSearchValue(v)
  }
  const onFocus = () => {
    setIsComponentVisible(true)
    immediate && trigger(searchValue)
  }

  return (
    <AppSearchWrapper ref={searchWrapperRef}>
      <AppSearchHeader>
        <AppInput
          id="searchValue"
          label="searchValue"
          handler={onType}
          onFocus={onFocus}
        />
        { showSearchButton  && (<Button onClick={() => trigger(searchValue)} color="info">Search</Button>) }
      </AppSearchHeader>
      {
        isComponentVisible && !!body?.length && (
          <AppSearchBody borderColor={theme.palette.primary.main}>
              <AppSimpleTable isSearchBody={true}
                              itemChosen={itemChosen}
                              headVisible={false}
                              data={body || []}
              />
          </AppSearchBody>
        )
      }
    </AppSearchWrapper>
  );
};