import React, {useEffect, useMemo, useState} from 'react';
import {categories} from "../../utils/consts";
import {AppCard} from "../../components/AppCard";
import {Pagination} from "@mui/lab";
import {HomeContainer} from "./Home.styled";
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Home = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const [amountOnPage, setAmountOnPage] = useState(0)
  const navigate = useNavigate()

  const onResizeEvent = (e?: Event) => {
    const isDesktop = window.innerWidth >= 900
    const isTablet = window.innerWidth >= 600

    if (isDesktop) {
      setAmountOnPage(rowsPerPage * 4)
    } else if (isTablet) {
      setAmountOnPage(rowsPerPage * 3)
    } else {
      setAmountOnPage(rowsPerPage * 2)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onResizeEvent)
    onResizeEvent()
    return function cleanup() {
      window.removeEventListener('resize', onResizeEvent)
    }
  }, [])

  const pages: number = useMemo(() => {
    if (!amountOnPage) return 0
    return Math.ceil(categories.length / amountOnPage)
  }, [amountOnPage])

  const start: number = useMemo(() => {
    return (page - 1) * amountOnPage
  }, [page, amountOnPage])

  const end: number = useMemo(() => {
    return page * amountOnPage
  }, [page, amountOnPage])

  const changePage = (_: any, page: number) => {
    setPage(page)
  }

  const redirectToCategory = (category: string) => {
    navigate(`/category/${category}`)
  }

  return (
    <HomeContainer>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
        {categories.slice(start, end).map((c) => (
          <Grid item xs={6} sm={4} md={3} key={c}>
            <AppCard onClick={() => redirectToCategory(c)} category padding='small'>
              {c}
            </AppCard>
          </Grid>
        ))}
      </Grid>

      <Pagination count={pages}
                  page={page}
                  onChange={changePage}
                  shape="rounded"
                  sx={{display: 'flex', justifyContent: 'center', margin: '20px 0 10px'}}
      />
    </HomeContainer>
  );
}
