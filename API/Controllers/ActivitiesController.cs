using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return HandleResult(await Mediator.Send(new List.Query()));
    }
    
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetActivity(Guid id)
    {
        var result = await Mediator.Send(new Details.Query{Id = id});

        return HandleResult(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
    {
        return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
    }

    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(Guid id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
    }
}