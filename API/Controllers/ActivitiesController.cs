using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController: BaseApiController
{
    private readonly DataContext _context;

    public ActivitiesController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await _context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await _context.Activities.FindAsync(id);
    }
    [HttpPost]
    public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
    {
        if (activity == null)
        {
            return BadRequest("Invalid data");
        }

        // Add the new activity to the database context
        _context.Activities.Add(activity);
        await _context.SaveChangesAsync();

        // Return a 201 Created response with the created activity
        return CreatedAtAction("GetActivity", new { id = activity.Id }, activity);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
    {
        if (id != activity.Id)
        {
            return BadRequest("Invalid data");
        }

        _context.Entry(activity).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Activities.Any(a => a.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<Activity>> DeleteActivity(Guid id)
    {
        var activity = await _context.Activities.FindAsync(id);
        if (activity == null)
        {
            return NotFound();
        }

        _context.Activities.Remove(activity);
        await _context.SaveChangesAsync();

        return activity;
    }

}