import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MaterialTable, { MaterialTableProps } from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    '& td:empty::after': {
      backgroundColor: theme.palette.grey[200],
      content: '""',
      height: '2px',
      position: 'absolute',
      width: '75px',
    },
  },
}))

const tableIcons = {
  Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />),
}

/**
 * Table is a MaterialTable wrapper with small changes to fit better on QL's use case
 * @param - https://material-table.com/#/docs/all-props
 */
const Table = <T extends object>(props: MaterialTableProps<T>) => {
  const classes = useStyles({})
  const { t } = useTranslation('photon')

  return (
    <span className={classes.root}>
      <MaterialTable
        icons={tableIcons}
        components={{
          Container: props => <Paper {...props} elevation={0} />,
          ...(props.components),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: t('table-empty-data-source-message'),
            filterRow: {
              filterTooltip: t('table-filter-tooltip'),
            },
          },
          header: {
            actions: t('table-header-actions'),
          },
          toolbar: {
            searchTooltip: t('table-search-tooltip'),
            searchPlaceholder: t('table-search-placeholder'),
          },
          pagination: {
            labelRowsSelect: t('table-label-rows-select'),
            labelDisplayedRows: t('table-label-displayed-rows'),
            firstTooltip: t('table-first-tooltip'),
            previousTooltip: t('table-previous-tooltip'),
            nextTooltip: t('table-next-tooltip'),
            lastTooltip: t('table-last-tooltip'),
          },
        }}
        {...props}
      />
    </span>
  )
}

export default Table
