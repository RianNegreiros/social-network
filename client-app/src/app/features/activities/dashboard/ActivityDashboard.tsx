import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Loader } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../layout/LoadingComponent";
import ActivityFilters from "./ActivityFilter";
import { PagingParams } from "../../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

export default observer(function ActivityDashboard() {
  const {activityStore} = useStore();
  const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1))
    loadActivities().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities])

  if (activityStore.loadingInitial && !loadingNext) return <LoadingComponent content="Loading activities..." />
  
  return (
    <Grid>
      <Grid.Column width='10'>
        {activityStore.loadingInitial && !loadingNext ? (
          <>
          <ActivityListItemPlaceholder />
          <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
          initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  )
})